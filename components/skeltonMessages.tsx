import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react"
import { ComponentProps, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

type WidthType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"

const SkeltonMMessage = () => {
    const [randomTextLines, setRandomTextLines] = useState(0)
    const [randomTextWidth, setRandomTextWidth] = useState<WidthType>("sm")

    useEffect(() => {
        setRandomTextLines(Math.floor(Math.random() * 3) + 1)
        const width: WidthType[] = ["xs", "sm", "md", "lg", "xl"]
        setRandomTextWidth(width[Math.floor(Math.random() * width.length)])
    }, [])

    return (
        <Box w={"full"} my={"4"}>
            <Flex>
                <Box w={"8"} mr="4">
                    <SkeletonCircle />
                </Box>
                <Flex direction={"column"} w={randomTextWidth}>
                    <Box fontSize={"md"}>
                        <SkeletonText noOfLines={1} />

                        <SkeletonText noOfLines={randomTextLines} mt={"4"} spacing={"4"} />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

interface Props extends ComponentProps<"div"> {
    onEnter: () => void
}

const SkeltonMessages = ({ onEnter }: Props) => {
    const count = 20

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            onEnter()
        }
    }, [inView])

    return (
        <div ref={ref}>
            {[...Array(count)].map((_, i) => (
                <SkeltonMMessage key={i} />
            ))}
        </div>
    )
}

export default SkeltonMessages
