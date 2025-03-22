type acceptedSong = {
    added_at: string;
    added_by: {
        display_name: string;
        external_urls: {
            spotify: string;
        };
        followers: {
            total: number;
            href: string;
        };
        href: string;
        id: string;
        images: null | image[];
        uri: string;
    };
    is_local: boolean;
    track: {
        Track: spotifySong;
    };
}

type spotifySong = {
    name: string;
    href: string;
    id: string;
    preview_url: string;
    album: album;
    explicit: boolean
}

type album = {
    images: image[];
    artists: artist[];
    name: string;
}

type image = {
    height: number;
    width: number;
    url: string;
}

type artist = {
    name: string;
    href: string;
    id: string;
}