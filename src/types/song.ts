export interface Song {
  _id: string;
  title: string;
  audio_url: string;
  image_url: string;
  genre?: string;
  mood?: string;
  lyrics?: string;
  createdAt?: string;
  song_setting?: SongSetting;
}

export interface SongResponse {
  data: Song;
}

export interface SongSetting {
  genre: string;
  mood: string;
}
