import React from "react";
import { Editor } from "../components";
import Head from "next/head";

export default function Create() {
  return (
    <div className="w-full">
      <Head>
        <title>Draw NFT</title>
      </Head>
      <Editor />
    </div>
  );
}
