-- 채팅방 테이블
CREATE TABLE chat_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('direct', 'group', 'learning_group')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- 채팅방 멤버 테이블
CREATE TABLE chat_room_members (
    room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_read_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (room_id, user_id)
);

-- 메시지 테이블
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
    content TEXT NOT NULL,
    attachments JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 인덱스 생성
CREATE INDEX idx_chat_room_members_user_id ON chat_room_members(user_id);
CREATE INDEX idx_messages_room_id ON messages(room_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- RLS 정책 설정
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 채팅방 정책
CREATE POLICY "사용자는 자신이 참여한 채팅방만 볼 수 있음"
    ON chat_rooms FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM chat_room_members
            WHERE chat_room_members.room_id = chat_rooms.id
            AND chat_room_members.user_id = auth.uid()
        )
    );

CREATE POLICY "사용자는 새로운 채팅방을 생성할 수 있음"
    ON chat_rooms FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- 채팅방 멤버 정책
CREATE POLICY "사용자는 자신이 참여한 채팅방의 멤버만 볼 수 있음"
    ON chat_room_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM chat_room_members AS cm
            WHERE cm.room_id = chat_room_members.room_id
            AND cm.user_id = auth.uid()
        )
    );

CREATE POLICY "채팅방 생성자는 멤버를 추가할 수 있음"
    ON chat_room_members FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM chat_rooms
            WHERE chat_rooms.id = chat_room_members.room_id
            AND chat_rooms.created_by = auth.uid()
        )
    );

-- 메시지 정책
CREATE POLICY "사용자는 자신이 참여한 채팅방의 메시지만 볼 수 있음"
    ON messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM chat_room_members
            WHERE chat_room_members.room_id = messages.room_id
            AND chat_room_members.user_id = auth.uid()
        )
    );

CREATE POLICY "사용자는 자신이 참여한 채팅방에 메시지를 보낼 수 있음"
    ON messages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM chat_room_members
            WHERE chat_room_members.room_id = messages.room_id
            AND chat_room_members.user_id = auth.uid()
        )
        AND auth.uid() = user_id
    );

CREATE POLICY "사용자는 자신의 메시지만 수정할 수 있음"
    ON messages FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "사용자는 자신의 메시지만 삭제할 수 있음"
    ON messages FOR DELETE
    USING (auth.uid() = user_id);

-- 함수 생성
CREATE OR REPLACE FUNCTION create_chat_room(
    creator_id UUID,
    room_name TEXT,
    room_type TEXT,
    member_ids UUID[]
) RETURNS chat_rooms AS $$
DECLARE
    new_room chat_rooms;
BEGIN
    -- 채팅방 생성
    INSERT INTO chat_rooms (name, type, created_by)
    VALUES (room_name, room_type, creator_id)
    RETURNING * INTO new_room;

    -- 멤버 추가
    INSERT INTO chat_room_members (room_id, user_id)
    SELECT new_room.id, unnest(member_ids);

    RETURN new_room;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION find_direct_chat_room(
    user_id_1 UUID,
    user_id_2 UUID
) RETURNS TABLE (
    id UUID,
    name TEXT,
    type TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by UUID
) AS $$
BEGIN
    RETURN QUERY
    SELECT cr.*
    FROM chat_rooms cr
    JOIN chat_room_members crm1 ON crm1.room_id = cr.id
    JOIN chat_room_members crm2 ON crm2.room_id = cr.id
    WHERE cr.type = 'direct'
    AND crm1.user_id = user_id_1
    AND crm2.user_id = user_id_2;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
CREATE OR REPLACE FUNCTION update_chat_room_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_chat_room_updated_at
    BEFORE UPDATE ON chat_rooms
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_room_updated_at();

CREATE TRIGGER update_message_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_room_updated_at(); 