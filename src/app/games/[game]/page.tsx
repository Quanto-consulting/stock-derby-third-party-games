"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const GamePage = () => {
    const { game } = useParams();
    const [link, setLink] = useState<string>("");

    const joinGame = async () => {
        const response = await axios
            .post("/api/external-user", {
                gameName: game,
            })
        const url = response.data.url;
        setLink(url);
    }

    useEffect(() => {
        joinGame();
    }, []);

    return (
        <section className="h-[100svh] w-screen">
            {link && <iframe src={link} className="w-full h-full" />}
        </section>
    )
}

export default GamePage;