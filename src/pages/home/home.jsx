import Carousel from "react-material-ui-carousel";
import {
  Container,
  Typography,
  Box,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import image1 from "../../assets/images/img1.jpg";
import image2 from "../../assets/images/img2.jpg";
import image3 from "../../assets/images/img3.jpg";
import image4 from "../../assets/images/gridimg1.jpg";
import image5 from "../../assets/images/gridimg2.jpg";
import image6 from "../../assets/images/cardimg1.jpg";
import image7 from "../../assets/images/cardimg2.jpg";
import image8 from "../../assets/images/cardimg3.jpg";
import image9 from "../../assets/images/cardimg4.jpg";
import image10 from "../../assets/images/cardimg5.jpg";
import image11 from "../../assets/images/cardimg6.jpg";
import image12 from "../../assets/images/slider1.jpg";
import image13 from "../../assets/images/slider2.jpg";
import image14 from "../../assets/images/slider3.jpg";
import image15 from "../../assets/images/slider4.jpg";
import image16 from "../../assets/images/slider5.jpg";
import image17 from "../../assets/images/slider6.jpg";
import image18 from "../../assets/images/slider7.jpg";
import image19 from "../../assets/images/slider8.jpg";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import "./home.css";

const Home = () => {
  // Carousel items
  const carouselItems = [
    {
      name: "Explore the Beauty",
      description: "Nature Always Wears The Color Of The Spirit!",
      image: image1,
    },
    {
      name: "Adventure Awaits",
      description: "If Beauty Were Time, You'd Be Eterity.",
      image: image2,
    },
    {
      name: " Beauty ",
      description: "Beauty Is Not In The Face,Beauty Is A Light In The Heart.",
      image: image3,
    },
  ];

  var cardItems = [
    {
      id: 1,
      title: "Vitamin C 23 Serum",
      description:
        "Brightness skin tone,Prevents Wrinkels and fine lines,Fade dark spots and hyperpigmentation .",
      image: image6,
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 2,
      title: "Niacinamide 15 Serum",
      description:
        "Controls and Balances oils and sebum,Improves skin texture,Tightens the looks of sagging pores .",
      image: image7,
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 3,
      title: "Hyalunoric Acid 3 Serum",
      description:
        "Hydrates and protects skin barrier,Pulmps and Improves the skin texture,Restores.",
      image: image8,
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 4,
      title: "Peptide Skin booster Serum",
      description:
        "Collagen boosting,Excess sebum and pore care,Brightning,Soothing,Firming .",
      image: image9,
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 5,
      title: "Snail 96 Mucin Power Serum",
      description:
        "Soothe damage skin, Repair dark spots,Improve skin vitality.",
      image: image10,
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
    {
      id: 6,
      title: "Glow Deep Serum",
      description:
        "Soothing that helps calm and restore imbalance in the skin caused by harsh environments. .",
      image: image11,
      buttonText1: "Share",
      buttonText2: "Learn More",
    },
  ];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  var sliderImages = [
    {
      src: image12,
      alt: "Image 3",
    },
    {
      src: image13,
      alt: "Image 4",
    },
    {
      src: image14,
      alt: "Image 5",
    },
    {
      src: image15,
      alt: "Image 6",
    },
    {
      src: image16,
      alt: "Image 7",
    },
    {
      src: image17,
      alt: "Image 5",
    },
    {
      src: image18,
      alt: "Image 6",
    },
    {
      src: image19,
      alt: "Image 7",
    },
  ];

  return (
    <>
      {/* Carousel Section */}
      <Carousel
        autoPlay={true}
        indicators={true}
        animation="fade"
        duration={2000}
        navButtonsAlwaysVisible={true}
        sx={{ marginBottom: 5 }}
      >
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            className="carousel-item"
            sx={{ position: "relative" }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "auto" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "10px 20px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4">{item.name}</Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </Box>
        ))}
      </Carousel>

      {/* Testimonial Section */}
      <Container sx={{ backgroundColor: "#f9fbe7" }}>
        <Typography
          variant="h3"
          color="primary"
          textAlign="center"
          sx={{ marginBottom: 5 }}
        >
          Testimonials
        </Typography>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: 5, flexWrap: "wrap", gap: 4}}
        >
          <Box
            data-aos="fade-up"
            sx={{ flex: "1 1 50%", textAlign: "center", maxWidth: "500px" }}
          >
            <Typography variant="h6" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              vero, corrupti minus quia quo eos odio! Eligendi, harum.
              Voluptate, nulla. Quo nobis cumque aspernatur et illum quae,
              voluptates corporis tempore.
            </Typography>
          </Box>
          <Box data-aos="flip-left" sx={{ flex: "1 1 50%", maxWidth: "500px" }}>
            <img
              src={image5}
              alt="testimonial"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          sx={{ flexWrap: "wrap", gap: 4 }}
        >
          <Box
            data-aos="flip-right"
            sx={{ flex: "1 1 50%", maxWidth: "500px", marginBottom: 5 }}
          >
            <img
              src={image4}
              alt="testimonial"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
          <Box
            data-aos="fade-up"
            sx={{ flex: "1 1 50%", textAlign: "center", maxWidth: "500px" }}
          >
            <Typography variant="h6" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              vero, corrupti minus quia quo eos odio! Eligendi, harum.
              Voluptate, nulla. Quo nobis cumque aspernatur et illum quae,
              voluptates corporis tempore.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container sx={{ background: "#f3e5f5" }}>
        <Typography
          fontSize={50}
          color={"#880e4f"}
          textAlign={"center"}
          sx={{ marginTop: 10 ,marginBottom:5}}
        >
          Special SkinCare Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          {cardItems.map((cardItem, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.8)",
                  marginBottom: 4,
                },
              }}
            >
              <CardMedia
                sx={{ height: 200, objectFit: "contain" }}
                image={cardItem.image}
                title={cardItem.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cardItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cardItem.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{ background: "#009688", color: "#fff" }}
                >
                  {cardItem.buttonText1}
                </Button>
                <Button
                  size="small"
                  sx={{ background: "#009688", color: "#fff" }}
                >
                  {cardItem.buttonText2}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
      <Container sx={{background:"#e3f2fd"}}>
        <Typography
          fontSize={50}
          color={"#880e4f"}
          textAlign={"center"}
          sx={{ marginTop: 10,marginBottom:5 }}
        >
          Cosmetic Items
        </Typography>
        <Slider
          {...settings}
          style={{
            marginLeft: "40px",
            marginBottom: "50px",
            maxWidth: "calc(100% - 40px)",
          }}
        >
          {sliderImages.map((sliderImage, index) => {
            return (
              <div
                key={index} 
                className="image-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom:"50px"
                }}
              >
                <img
                  src={sliderImage.src}
                  alt={sliderImage.alt || "Slider Image"} 
                  height="300"
                  width="300"
                />
              </div>
            );
          })}
        </Slider>
      </Container>
    </>
  );
};

export default Home;
