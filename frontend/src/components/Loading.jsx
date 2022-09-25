const Loading = (props) => {
    return (
        <div className="loading" style={{opacity: props.lowOpacity ? 1 : .1}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading;