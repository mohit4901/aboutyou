import { motion, useTransform } from "framer-motion";

export const ScrollSplitText = ({
  text,
  progress,
  start = 0,
  end = 1,
  className = "",
}) => {
  const letters = text.split("");

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((char, i) => {
        const letterProgress = start + (end - start) * (i / letters.length);

        const opacity = useTransform(
          progress,
          [letterProgress - 0.05, letterProgress],
          [0.15, 1]
        );

        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
};
