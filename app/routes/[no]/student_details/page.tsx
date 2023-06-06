"use client"
import { usePathname } from "next/navigation";

const Student = () => {
    const pathname = usePathname()
    return(<>
    {pathname}
    </>)
}
export default Student;

