import Link from "next/link";

export default function FirstPost() {
    return (
        <div>
            <h1>最初の投稿</h1>
            <Link href="/">ホームに戻る</Link>
        </div>
    );
}