import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout/Layout";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <Layout className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center gap-4">
                <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
                <Button asChild>
                    <Link to="/game">
                        <span className="font-bold">1.</span>
                        Play Against AI
                    </Link>
                </Button>
                <Button asChild>
                    <Link to="/game">
                        <span className="font-bold">2.</span>
                        Play Against Other Player
                    </Link>
                </Button>
            </div>
        </Layout>
    );
}
