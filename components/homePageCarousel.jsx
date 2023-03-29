import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

function Card({ ...item }) {
  const { classes } = useStyles();
  const [singleImage, setSingleImage] = useState();
  const downloadImage1 = async () => {
    if (item.firstImage) {
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(item.firstImage);

      if (data) {
        const url = URL.createObjectURL(data);
        setSingleImage(url);
        console.log(url);
      }
    }
  };
  useEffect(() => {
    downloadImage1();
  }, []);
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${singleImage})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.prices} size="xs">
          {item.prices}
        </Text>
        <Title order={3} className={classes.title}>
          {item.title}
        </Title>
      </div>
    </Paper>
  );
}
const data = [
  {
    title: "Best forests to visit in North America",
    category: "new",
  },
  {
    title: "Hawaii beaches review: better than you think",
    category: "new",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "new",
  },
  {
    title: "Aurora in Norway: when to visit for best experience",
    category: "new",
  },
  {
    title: "Best places to visit this winter",
    category: "new",
  },
  {
    title: "Active volcanos reviews: travel at your own risk",
    category: "new",
  },
];
export default function HomePageCarousel({ hotels }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = hotels.map((item) => (
    <Carousel.Slide className=" cursor-pointer" key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));
  useEffect(() => {
    console.log(hotels);
  });
  return (
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      nextControlIcon={<IconArrowRight size={16} />}
      previousControlIcon={<IconArrowLeft size={16} />}
      loop
    >
      {slides}
    </Carousel>
  );
}
