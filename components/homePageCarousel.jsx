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
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
        <Title order={3} className={classes.title}>
          <h2 className="text-2xl text-white rounded-md bg-mainPurple p-2 bg-opacity-30 flex items-center justify-center">
            {item.title}
          </h2>
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
    <Carousel.Slide
      className=" cursor-pointer transition-all ease-in duration-150 transform hover:scale-95 "
      key={item.title}
    >
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 1}
      nextControlIcon={<IconArrowRight size={16} />}
      previousControlIcon={<IconArrowLeft size={16} />}
      loop
    >
      {slides}
    </Carousel>
  );
}
