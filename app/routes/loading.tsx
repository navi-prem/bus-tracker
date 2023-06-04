const loading = () => {
    return(<>
        <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
            <div className="animate-spin inline-block w-12 h-12 border-[4px] border-current border-t-transparent text-white rounded-full">
            <span className="sr-only">Loading...</span>
            </div>
            <div className="m-3 text-xl text-white">Wait Let Bro Cook Your Data</div>
        </div>
    </>)
}
export default loading;
