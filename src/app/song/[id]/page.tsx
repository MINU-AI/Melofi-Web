"use client";
import { useState, useEffect } from "react";
import { songApi } from "@/services/songApi";
import { Song } from "@/types/song";
import { Typography, Spin } from "antd";
import SongCard from "@/components/song-view";
import { useParams } from "next/navigation";

export default function SongPage() {
  const params = useParams();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = params.id as string;

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await songApi.getSong(id);
        setSong(response.data);
      } catch (err) {
        setError("Failed to fetch song");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  if (loading) return <Spin size="large" />;
  if (error) return <Typography.Text type="danger">{error}</Typography.Text>;
  if (!song) return <Typography.Text>No song found</Typography.Text>;
 
  return (
    <div >
      <SongCard song={song} />
    </div>
  );
}
