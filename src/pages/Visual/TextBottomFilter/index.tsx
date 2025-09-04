
const TextBottomFilter = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
        <div className="text-s h-full p-4 overflow-y-auto color-gray-400" style={{scrollbarWidth: 'none'}}>一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字一段测试文字</div>
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
            background: 'linear-gradient(to bottom,transparent,#fcfcfc)',
            maskImage: 'linear-gradient(to top,#fcfcfc 25%,transparent)',
            backdropFilter: 'blur(1px)',
        }}
        ></div>
    </div>
  )
}

export default TextBottomFilter