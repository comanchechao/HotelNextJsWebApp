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
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

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

  prices: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

function Card({ hotels, hotel }) {
  const { classes } = useStyles();
  const [singleImage, setSingleImage] = useState("");

  const downloadImage1 = async () => {
    const { data, error } = await supabase.storage
      .from("/public/hotel-images")
      .download(hotel.firstImage);

    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setSingleImage(url);
  };
  useEffect(() => {
    downloadImage1();
    console.log(hotels.title);
  });

  hotels.map((hotel, i) => {
    return (
      <Paper
        key={i}
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${singleImage})` }}
        className={classes.card}
      >
        <div>
          <Text className={classes.prices} size="xs">
            {hotel.prices}
          </Text>
          <Title order={3} className={classes.title}>
            {hotel.title}
          </Title>
        </div>
      </Paper>
    );
  });
}
const data = [
  {
    title: "Best forests to visit in North America",
    prices: "new",
  },
  {
    title: "Hawaii beaches review: better than you think",
    prices: "new",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    prices: "new",
  },
  {
    title: "Aurora in Norway: when to visit for best experience",
    prices: "new",
  },
  {
    title: "Best places to visit this winter",
    prices: "new",
  },
  {
    title: "Active volcanos reviews: travel at your own risk",
    prices: "new",
  },
];
export default function HomePageCarousel({ hotels }) {
  useEffect(() => {
    console.log(hotels);
  });
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = hotels.map((hotel, i) => (
    <Carousel.Slide className=" cursor-pointer" key={i}>
      <Card hotels={hotels} hotel={hotel} {...hotel} />
    </Carousel.Slide>
  ));

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
