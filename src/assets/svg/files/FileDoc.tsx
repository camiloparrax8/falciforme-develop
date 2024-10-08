const FileDoc = ({
    height = 100,
    width = 100,
}: {
    height?: number
    width?: number
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 287.82 384"
            width={width}
            height={height}
        >
            <path
                fill="#4a81f4"
                d="M652.52 792.45h192s50.06.1 49-59.26 0-210.58 0-210.58H785.16l-1-114.16H652.52s-45.94 1.52-46.52 53 0 284.71 0 284.71 4.19 44.97 46.52 46.29z"
                transform="translate(-605.74 -408.45)"
            ></path>
            <path
                fill="#759ff7"
                d="M178.39 0L287.82 114.16 179.42 114.16 178.39 0z"
            ></path>
            <path
                fill="#fff"
                d="M825.17 582.35h-20.59c-7 0-12.68 4.47-12.68 10s5.68 10 12.68 10h20.59c7 0 12.68-4.48 12.68-10s-5.68-10-12.68-10zM754.87 582.35H674c-7 0-12.68 4.47-12.68 10s5.68 10 12.68 10h80.85c7 0 12.68-4.48 12.68-10s-5.66-10-12.66-10zM826.17 633.06H674c-7 0-12.68 4.48-12.68 10s5.68 10 12.68 10h152.17c7 0 12.68-4.48 12.68-10s-5.68-10-12.68-10zM826.17 683.78H674c-7 0-12.68 4.47-12.68 10s5.68 10 12.68 10h152.17c7 0 12.68-4.48 12.68-10s-5.68-10-12.68-10z"
                transform="translate(-605.74 -408.45)"
            ></path>
        </svg>
    )
}

export default FileDoc
