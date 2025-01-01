import Image from "next/image"

interface LogoProps {
    w?: number; 
    h?: number; 
  }

const Logo = ({ w = 130, h = 130 }: LogoProps) => {
  return (
    <Image 
      src={'/logo.svg'} 
      alt="Milfar Academy" 
      width={w} 
      height={h} 
    />
  )
}

export default Logo