import {useEffect, useState, useRef} from "react";

function App() {
    const shakeSensitivity = import.meta.env.VITE_SHAKE_SENSITIVITY;
    const fict = [
        "672.jpeg",
        "603.jpeg",
        "3619.jpeg",
        "2846.jpeg",
        "103.png",
        "6426.png",
        "5857.jpeg",
        "3998.jpeg",
        "7812.jpg",
        "5465.jpeg",
        "7507.png",
        "1089.jpeg",
        "3437.jpeg",
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
        "123.png",
        "2051.jpeg",
        "6067.jpeg",
        "6329.jpeg",
        "3957.jpeg",
        "1382.jpeg",
        "2214.jpeg",
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
    ];
    const [rootURL, setRootURL] = useState(localStorage.getItem("rootURL"));
    const [initialArr, setInitialArr] = useState(fict);
    const shuffle = () => {
        const transitionImgs = JSON.parse(localStorage.getItem("transImgs"));
        let newArr = initialArr
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
        console.log(transitionImgs);

        transitionImgs
            ? transitionImgs.forEach((item) => {
                  newArr.unshift(item);
              })
            : null;
        console.log(transitionImgs, newArr);
        return newArr;
    };
    const [imgArr, setImgArr] = useState(shuffle());
    const [hiddenState, setHiddenState] = useState(sessionStorage.getItem("hidden") !== "false");
    const toggleHiddenState = () => {
        sessionStorage.setItem("hidden", !hiddenState);
        setHiddenState(!hiddenState);
    };
    const updateRootURL = (formData) => {
        const urlType = formData.get("urlType");
        const url = formData.get("url");
        setRootURL(urlType + url);
        localStorage.setItem("rootURL", urlType + url);
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

        document.addEventListener("scroll", () => {
            let height =
                window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            height = height * 100;
            console.log(height);
            if (height + 0.3 >= 100) {
                setImgArr(shuffle());
            }
        });
    }, []);

    useEffect(() => {
        const elem = document.querySelector("img + img");
        elem ? elem.scrollIntoView({behavior: "auto", block: "end"}) : null;
    }, [imgArr]);

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
                            <path d="M480-385 302-207q-20 20-48 20t-47-20q-20-20-20-47.5t20-47.5l178-178-178-179q-20-20-20-47.5t20-47.5q19-20 47-20t48 20l178 178 178-178q20-20 48-20t47 20q20 20 20 47.5T753-659L575-480l178 178q20 20 20 47.5T753-207q-19 20-47 20t-48-20L480-385Z" />
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
                            <path d="M614-634q16 17 28.5 40t19.5 48q0 23.58-16 39.79T606-490q-23 0-39.5-16.21T550-546q1-7-1-13t-7.21-11q-5.2-4-11-6.5Q525-579 518-578q-22 0-38-16t-16-38q0-22 16-38t38-16q27 6 51 19t45 33Zm-134-88q-8.89 0-17.45 1-8.55 1-17.55 1-25 2-47-11.5T369-770q-6-24 7-45t37-24q17-2.44 33.5-3.22Q463-843 480-843q148 0 272 79t188 214q6 12 9 24.44 3 12.45 3 25.5 0 13.06-1.93 26.78T942-448q-17 34-38.5 65T856-324q-17 19-41.5 17T773-328q-16-19-14.5-44t17.5-44q17-20 31-40.5t26-43.5q-53.26-99.84-146.63-160.92Q593-722 480-722Zm0 565q-145.29 0-266.15-77Q93-311 27-440q-7-14-11-28.95t-4-31q0-16.05 3-31.55T25-562q18-36 41.37-67.94Q89.74-661.87 118-691l-70-71q-15-14.73-15-35.87Q33-819 48-835q15-15 36.5-15t36.5 15l699 699q15 15 14.5 36.5T820-64q-16 15-37 15t-36-15L628-181q-35 13-72.5 18.5T480-157ZM205-608q-23 25-42.18 51.89Q143.65-529.22 128-500q50.26 101.84 144.63 161.92Q367-278 480-278q12 0 24.5-1t24.5-3l-28-31q-6 1-11 1.5t-10 .5q-79 0-134-55t-55-134q0-5-.5-10t.5-11l-86-87Zm352 69Zm-191 94Z" />
                        </svg>
                    </button>
                    <div id="imgContainter" className={hiddenState ? "hidden" : ""}>
                        {imgArr.map((imgSrc, index) => {
                            if (index === imgArr.length - 1) {
                                const transImgs = [imgArr[index], imgArr[index - 1]];
                                console.log("transImgs", transImgs);

                                localStorage.setItem("transImgs", JSON.stringify(transImgs));
                            }
                            return <img key={index} src={`${rootURL}/${imgSrc}`} loading="lazy" />;
                        })}
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
                        <button type="submit">Set rootURL</button>
                    </form>
                </>
            )}
        </>
    );
}

export default App;
