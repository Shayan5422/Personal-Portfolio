export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-black border-t border-green-500/20">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Shayan Hashemi. All rights reserved.</p>
          </div>
          <div className="flex items-center">
            <span className="text-green-400 font-mono text-sm">&lt;/&gt; with 💚 by Shayan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
