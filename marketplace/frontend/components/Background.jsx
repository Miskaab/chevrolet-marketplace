function Background() {
  const particles = Array.from({ length: 60 })

  return (
    <div className="animated-bg">
      {particles.map((_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`
          }}
        />
      ))}
    </div>
  )
}

export default Background