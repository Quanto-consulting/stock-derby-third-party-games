import { useParams } from "next/navigation";

const GamePage = () => {
    const { game } = useParams();
    return (
        <section className="h-[100svh] w-screen">
            <iframe src={`http://localhost:3000/provider-games/${game}`} className="w-full h-full" />
        </section>
    )
}

export default GamePage;