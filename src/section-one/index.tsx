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
  const [audioUrl, setAudioUrl] = useState("");
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    console.log("로드합니다");

    try {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;
      console.log("ffmpeg", ffmpeg);

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
    // 즉, unit8ArrayData를 라는 데이터를 "test1.mp4" 라는 경로에 저장
    // 가상 경로에 저장 성공할 경우가 , true 아니면은 false
    await ffmpeg.writeFile("test1.mp4", unit8ArrayData);
    // -i test1.mp4 파일은 입력 파일 지정, -q:a 0은 오디오 품질을 0으로 설정, -map a는 오디오만 추출, test1.mp3는 출력 파일 이름 지정
    // 성공하면은 0, 실패하면은 1
    await ffmpeg.exec([
      "-i",
      "test1.mp4",
      "-q:a",
      "0",
      "-map",
      "a",
      "test1.mp3",
    ]);

    // result는 unit8Array
    const data = await ffmpeg.readFile("test1.mp3");
    // Blob {size: 53868242, type: 'audio/mp3'}
    const audioBlob = new Blob([data], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
    setLoaded(false);
  };

  useEffect(() => {
    load();
  }, []);
  console.log("load", loaded);
  console.log("audioUrl");

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
