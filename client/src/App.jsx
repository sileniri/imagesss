import {useEffect, useState, useRef} from "react";

function App() {
    const shakeSensitivity = import.meta.env.VITE_SHAKE_SENSITIVITY;
    const fict = [
        "60.png",
        "7288.jpg",
        "2805.jpeg",
        "5451.webp",
        "4105.jpeg",
        "672.jpeg",
        "603.jpeg",
        "3619.jpeg",
        "103.png",
        "6426.png",
        "5857.jpeg",
        "3998.jpeg",
        "7812.jpg",
        "5465.jpeg",
        "7507.png",
        "1089.jpeg",
        "6070.jpeg",
        "1349.jpeg",
        "7558.png",
        "6310.jpeg",
        "3462.jpeg",
        "6774.png",
        "7446.png",
        "618.jpeg",
        "6043.jpeg",
        "1488.jpeg",
        "7755.jpg",
        "3167.jpeg",
        "986.jpeg",
        "2978.jpeg",
        "2051.jpeg",
        "6067.jpeg",
        "6329.jpeg",
        "3957.jpeg",
        "1382.jpeg",
        "6991.jpg",
        "7823.jpg",
        "3850.jpeg",
        "3792.jpg",
        "5899.jpeg",
        "2260.jpeg",
        "73.png",
        "7712.png",
        "7463.png",
        "2162.jpeg",
        "1009.jpeg",
        "762.jpeg",
        "5997.jpeg",
        "6050.png",
        "1932.png",
        "6184.jpeg",
        "29.png",
        "1743.jpeg",
        "6011.png",
        "7684.jpg",
        "7911.jpg",
        "5946.png",
        "6330.jpeg",
        "1050.jpeg",
        "3891.jpeg",
        "4673.png",
        "2331.jpeg",
        "4226.jpeg",
        "2561.jpeg",
        "5563.jpeg",
    ];
    const top8 = ["7755.jpg", "1009.jpeg", "3792.jpg", "6426.png", "6310.jpeg", "4226.jpeg", "2561.jpeg", "6991.jpg"];
    const [initialArr, setInitialArr] = useState(localStorage.getItem("initArr") === "top8" ? top8 : fict);
    const [rootURL, setRootURL] = useState(localStorage.getItem("rootURL"));
    const shuffle = () => {
        console.log(initialArr.length);
        if (initialArr.length > 4) {
            let newArr = initialArr
            .map((value) => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value);
            return newArr;
        }
    };
    const [imgArr, setImgArr] = useState(rootURL ? shuffle() : null);
    const [hiddenState, setHiddenState] = useState(sessionStorage.getItem("hidden") !== "false");
    const [modeState, setModeState] = useState("");
    const [fullscreen, setFullscreen] = useState(false);
    const toggleHiddenState = () => {
        sessionStorage.setItem("hidden", !hiddenState);
        setHiddenState(!hiddenState);
    };
    const toggleMode = () => {
        modeState == "" ? setModeState("fixed") : setModeState("");
    };
    const toggleFullScreen = () => {
        setFullscreen(!fullscreen);
    };
    const updateRootURL = (formData) => {
        const urlType = formData.get("urlType");
        const url = formData.get("url");
        const initArr = formData.get("initArr");
        setRootURL(urlType + url);
        localStorage.setItem("rootURL", urlType + url);
        setInitialArr(initArr === "top8" ? top8 : fict);
        localStorage.setItem("initArr", initArr);
    };

    const handleMotion = (evt) => {
        const x = evt.accelerationIncludingGravity.x;
        const y = evt.accelerationIncludingGravity.y;
        const z = evt.accelerationIncludingGravity.z;

        const acceleration = Math.sqrt(x * x + y * y + z * z);

        if (acceleration > shakeSensitivity) {
            console.log("SHAKE!!!");
            setHiddenState(true);
            sessionStorage.setItem("hidden", "true");
        }
    };

    useEffect(() => {
        window.addEventListener("devicemotion", handleMotion);

        setTimeout(() => {
            document.addEventListener("scroll", () => {
                let height =
                    window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
                height = height * 100;
                // console.log(height);
                if (height + 1 >= 100) {
                    // setImgArr(imgArr.concat(shuffle()));
                    const imgCont = document.querySelector("#imgContainer");
                    const imgs = shuffle();
                    imgs.forEach((imgSrc) => {
                        imgCont.innerHTML += `<div class="img" style="--_url: url(${rootURL}/${imgSrc})"> <img src="${rootURL}/${imgSrc}" loading="lazy" /> </div>`;
                    });
                }
            });
        }, 1000);
        window.addEventListener("focus", () => {
            setHiddenState(sessionStorage.getItem("hidden") !== "false");
        });
        window.addEventListener("blur", () => {
            setHiddenState(true);
        });
    }, []);

    useEffect(() => {
        fullscreen ? document.body.requestFullscreen() : document.exitFullscreen();
    }, [fullscreen]);

    return (
        <>
            {rootURL ? (
                <>
                    <button
                        className="close"
                        onClick={() => {
                            localStorage.removeItem("rootURL");
                            setRootURL(null);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                        >
                            <path d="M480-392 300-212q-18 18-44 18t-44-18q-18-18-18-44t18-44l180-180-180-180q-18-18-18-44t18-44q18-18 44-18t44 18l180 180 180-180q18-18 44-18t44 18q18 18 18 44t-18 44L568-480l180 180q18 18 18 44t-18 44q-18 18-44 18t-44-18L480-392Z" />
                        </svg>
                    </button>
                    <button className="visibility" onClick={toggleHiddenState}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                        >
                            <path d="M607-627q15 15 27 36.5t19 44.5q0 22-15 37t-37 15q-22 0-37-15t-15-37q2-7 0-12.5t-7-10.5q-5-5-10.5-7.5T518-577q-20 0-34.5-15T469-627q0-20 14.5-34.5T518-676q25 5 47 17t42 32Zm-127-93q-10 0-19.5.5T441-718q-23 2-43-10t-26-35q-6-23 6-42t35-22q17-2 33.5-3t33.5-1q144 0 264.5 76.5T928-547q5 11 8 23t3 24q0 12-2 24.5t-7 23.5q-17 34-39 64.5T843-329q-15 17-37.5 15T768-333q-15-17-14-40t16-40q17-20 32-42t28-45q-52-100-145-160t-205-60Zm0 551q-140 0-257.5-74.5T39-443q-7-14-10.5-28T25-500q0-15 3-29.5T38-558q18-37 42.5-69.5T134-689l-73-73q-14-14-14-33t14-33q14-14 33.5-14t33.5 14l685 685q14 14 14 33t-14 33q-14 14-33 14t-33-14L630-193q-36 13-74 18.5t-76 5.5ZM213-613q-25 26-45 54t-37 59q50 101 143.5 160.5T480-280q15 0 30-1.5t30-3.5l-36-38q-6 2-12 2.5t-12 .5q-75 0-127.5-52.5T300-500v-12q0-6 1-12l-88-89Zm343 74Zm-180 90Z" />
                        </svg>
                    </button>
                    <button className="mode" onClick={toggleMode}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                        >
                            <path d="m287-231 52 52q19 19 18.5 44.5T338-90q-19 18-45 18t-44-18L90-249q-9-9-13.5-21T72-294q0-12 4.5-23.5T90-338l159-159q18-18 43.5-18t44.5 18q19 18 19.5 44T338-408l-51 51h524q26 0 44.5 18.5T874-294q0 26-18.5 44.5T811-231H287Zm386-372H149q-26 0-44.5-18.5T86-666q0-26 18.5-44.5T149-729h524l-52-52q-19-19-18.5-44.5T622-870q19-18 45-18t44 18l159 159q9 9 13.5 21t4.5 24q0 12-4.5 23.5T870-622L711-463q-18 18-43.5 18T623-463q-19-18-19.5-44t18.5-45l51-51Z" />
                        </svg>
                    </button>
                    <button className="fullscreen" onClick={toggleFullScreen}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                        >
                            <path d="M212-212h71q26 0 44.5 18.5T346-149q0 26-18.5 44.5T283-86H149q-26 0-44.5-18.5T86-149v-134q0-26 18.5-44.5T149-346q26 0 44.5 18.5T212-283v71Zm536 0v-71q0-26 18.5-44.5T811-346q26 0 44.5 18.5T874-283v134q0 26-18.5 44.5T811-86H678q-26 0-44.5-18.5T615-149q0-26 18.5-44.5T678-212h70ZM212-748v70q0 26-18.5 44.5T149-615q-26 0-44.5-18.5T86-678v-133q0-26 18.5-44.5T149-874h134q26 0 44.5 18.5T346-811q0 26-18.5 44.5T283-748h-71Zm536 0h-70q-26 0-44.5-18.5T615-811q0-26 18.5-44.5T678-874h133q26 0 44.5 18.5T874-811v133q0 26-18.5 44.5T811-615q-26 0-44.5-18.5T748-678v-70Z" />
                        </svg>
                    </button>
                    <div id="imgContainer" className={(hiddenState ? "hidden " : "") + modeState}>
                        {imgArr.map((imgSrc, index) => (
                            <div className="img" style={{"--_url": `url(${rootURL}/${imgSrc})`}}>
                                <img key={index} src={`${rootURL}/${imgSrc}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <form action={updateRootURL}>
                        <span>
                            <select name="urlType">
                                <option value="https://">https://</option>
                                <option value="http://">http://</option>
                            </select>
                            <input type="text" name="url" />
                        </span>
                        <select name="initArr">
                            <option value="fict">fict</option>
                            <option value="top8">top8</option>
                        </select>
                        <button type="submit">Set rootURL</button>
                    </form>
                </>
            )}
        </>
    );
}

export default App;
