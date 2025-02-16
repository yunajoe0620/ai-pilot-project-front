import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";

/**
 * step1 => MP4파일을 MP3로 변환하기
 * step2 => MP3파일에서 text를 를 추출하기   * 
 *  audio_file = open("your_audio.mp3", "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
 * step3 => 추출한 text를 summrization하기
 */
function SectionOne() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    console.log("로드합니다");

    try {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;
      console.log("ffmpeg", ffmpeg);
      // ffmpeg.on("log", ({ message }) => {
      //   console.log("message", message);
      //   if (messageRef.current) messageRef.current.innerHTML = message;
      // });

      // await ffmpeg.load();
      // await ffmpeg.load({
      //   coreURL: await toBlobURL(
      //     `${baseURL}/ffmpeg-core.js`,
      //     "text/javascript"
      //   ),
      //   wasmURL: await toBlobURL(
      //     `${baseURL}/ffmpeg-core.wasm`,
      //     "application/wasm"
      //   ),
      // });
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      setLoaded(true);
      console.log("로드끗");
    } catch (error) {
      console.log("error", error);
    }
  };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const filePath = "/1x5oiqlsst.mp4";
    const unit8ArrayData = await fetchFile(filePath);
    console.log("uni8", unit8ArrayData);
    //  writeFile: (path: string, data: FileData, { signal }?: FFMessageOptions) => Promise<OK>;
    //  writefile함슈는 FFmpeg가 사용하는 가상 파일 시스템에 파일을 쓰는 작업
    // 즉, unit8ArrayData를 라는 데이터를 "/public/test1.avi" 라는 경로에 저장
    //
    const result = await ffmpeg.writeFile("/public/test1.avi", unit8ArrayData);

    // const result = await ffmpeg.writeFile("/public/input.avi", unit8ArrayData);
    // const result2 = await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
    // console.log("result", result, result2);

    // const videoURL =
    //   "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi";
    // const ffmpeg = ffmpegRef.current;
    // await ffmpeg.writeFile("input.avi", await fetchFile(filePath));
    // await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
    // const fileData = await ffmpeg.readFile("output.mp4");
    // const data = new Uint8Array(fileData as ArrayBuffer);
    // console.log("data", data);
    // if (videoRef.current) {
    //   videoRef.current.src = URL.createObjectURL(
    //     new Blob([data.buffer], { type: "video/mp4" })
    //   );
    // }
  };

  useEffect(() => {
    load();
  }, []);
  console.log("load", loaded);

  return (
    <>
      <video controls width="750" height="500">
        <source src="/1x5oiqlsst.mp4" type="video/mp4" />
      </video>
      <button onClick={transcode}>mp4파일을 mp3파일로 변환하기 </button>
    </>
  );
}

export default SectionOne;
