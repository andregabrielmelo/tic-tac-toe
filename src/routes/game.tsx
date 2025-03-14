import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "@/components/layout/Layout";

import { TicTacToe } from "@/tools/tic-tac-toe";

export const Route = createFileRoute("/game")({
    component: Game,
});

function Game() {
    return (
        <Layout className="flex flex-col justify-center items-center gap-4">
            <TicTacToe />
        </Layout>
    );
}
