import Link from "next/link"

function Footer() {
  return (
    <footer className="sticky bottom-0 bg-gray-800 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Investment Opportunities Map. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link href="/privacy" className="hover:text-blue-300 ">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-blue-300">Contact Us</Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer
