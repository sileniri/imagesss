import {useEffect, useState} from "react";

function App() {
    const shakeSensitivity = import.meta.env.VITE_SHAKE_SENSITIVITY;
    const caoc = [
        "rd-d/ALs6j_Hga8sHbvQ14YRHpZDIgR6Olr32oX-MgZ8ApHFlHzQ0-5WopOEEjS3HEtyuAI740AmVFE1JCfQ3hVPp8WhAecw6Njj89tT5S9aNTzINbgfNPPwaelxvif-NGaWdG-U0MzpIH-Z_EGfWkHGl63sSse6pt4Mc64gSKRAYVN44FiHCewaRI7Zks5EDw8BCcx6MU_JsGFioXmUr5qxT0n3V08q8kgfblK3vssNbw2tMX6_F23XHmOvFYWzxCHYYuye8e-V40--6PSQeOpT4tw85ImrcI2N9FzafU2EoA2SLnUU56S2W5hTM6ghhlSbwExDHjmFpwlxce75DrRVQAu8HY1t9r-bhupTHJNKGR-40hYYs8UYwyG6uGrBiTnTi0NjqczC7Czcokf5GnV5_gTxQobaVR2L3G7eZQKj1rswQPCFJfTFCNt8rrJWc_mf_woYZFrfCSaqE5u-TSn8FsuhcBllrtWXbkY1o9fnZcgxfqI_08ZIBdoSHDHEtP9Vkws9PZohr_t1sjZaj_6pv0VtOvLh4101Pye0Y7Nl9vByyfmVDi6e4H0415RyMdYWmDW36Hfk-dD5AUcbXma4c7fbb7m9UXSiBerzNr7_dLYnkQAwewAdCufCW0GVRhawzEN27rfytitq7E6XyWY_HXHOBlWD82PLHAWTjJEC88eI3DxnWNTi-78HtSFgSL7oVJEeir8Uv4dKFocYtaGgCdgBTCk65Zun4QiF9KswURm9PlUrXostyvYfHi7eMzAS13-0p-hVXBQm1WU5ZykKbV1o8v9EVG7z9SQrTrh-lm6Z-cWLQK1Nse54IU9Kdc6hKN3ixEMrssjPrnQoKg4_Mz69-xxJuPcuEwEOKts_lFNlFp6igO9TTH2Hzp-8KCe9DHA659hQh8D3Msu283MIG4mA_l5MgIXbNvecYMgiee5AC1fYNf4EaIm551pcCW3WinBxBDd6YhJpfyYiUbFOIWN-s6oya344hqHIXslDInJTOiYlXvkPMNDmppVctHhWsHPu-oRRuqD3lzOH28qWw1ClGxtAxGZ7A_-zGwVgzgl38Ow--Uy0o=w2880-h1462?auditContext=prefetch",
    ];
    const fict = [
        "672.jpeg",
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
        "4377.jpeg",
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
    const shuffle = (arr) => {
        const newArr = arr
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
        return newArr;
    };
    const [imgArr, setImgArr] = useState(shuffle(initialArr));
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
        window.addEventListener("handlemotion", handleMotion);
    }, []);
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
                    <button className="shuffle" onClick={() => setImgArr(shuffle(imgArr))}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                        >
                            <path d="M613-114q-24 0-40.5-17T556-171q0-24 17-41t41-17h34l-73-73q-17-17-16.5-41t17.5-41q17-16 40-16t40 16l74 72v-33q0-25 17-41t42-16q25 0 41 16t16 41v163q0 29-19.5 48.5T778-114H613Zm-483-16q-17-17-16.5-40.5T131-211l517-519h-35q-24 0-40.5-17T556-789q0-25 17-41t42-16h163q29 0 48.5 19.5T846-778v164q0 24-16 40.5T789-557q-25 0-42-17t-17-42v-33L211-130q-17 17-40.5 17T130-130Zm1-619q-16-17-16-39.5t16-40.5q17-17 40-17.5t41 16.5l177 177q18 18 17.5 41T389-572q-17 17-40 17.5T308-572L131-749Z" />
                        </svg>
                    </button>
                    <div className={hiddenState ? "hidden" : ""}>
                        {imgArr.map((imgSrc, index) => (
                            <img key={index} src={`${rootURL}/${imgSrc}`} loading="lazy" />
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
                        <button type="submit">Set rootURL</button>
                    </form>
                </>
            )}
        </>
    );
}

export default App;
