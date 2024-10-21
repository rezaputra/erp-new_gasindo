import { Footer } from "./_components/footer/footer"
import { Navbar } from "./_components/navbar/navbar"


function MarketingLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         {children}
         <Footer />
      </>
   )
}

export default MarketingLayout