type EventModel = {
    user_uuid: string;
    playlist_uuid: string;
    playlist_id: string;
    name: string;
    playlist_code: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    member_count: number;
};

type EventsResponse = {
    owner: EventModel[];
    member: EventModel[];
};

export type { EventModel, EventsResponse };