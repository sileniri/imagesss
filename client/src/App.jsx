import {useState} from "react";

function App() {
    const initialArr = [
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
    const shuffle = (arr) => {
        const newArr = arr
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
        return newArr;
    };
    const [imgArr, setImgArr] = useState(shuffle(initialArr));
    const [rootURL, setRootURL] = useState(localStorage.getItem("rootURL"));
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
                        <span className="material-symbols-rounded">close</span>
                    </button>
                    <button className="visibility" onClick={toggleHiddenState}>
                        <span className="material-symbols-rounded">visibility_off</span>
                    </button>
                    <button className="shuffle" onClick={() => setImgArr(shuffle(imgArr))}>
                        <span className="material-symbols-rounded">shuffle</span>
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
