import { Box, Typography } from "@mui/material"

// @TODO: Make this dynamic based on the gym
const SocialsContainer = () => {
  return (
    <Box className="route-image-grid">
      <Box className="route-placard-images">
        <img className="route-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="Central Rock Gym logo" />
      </Box>
      <Box className="route-social-grid">
        <Box>
          <img className="route-instagram-logo" src="/images/Facebook_logo.png" alt="Facebook logo" />
          <Typography variant="body1" className="route-insta-handle">Central Rock Worcester</Typography>
        </Box>
        <Box>
          <img className="route-instagram-logo" src="/images/Twitter_colored_logo.png" alt="Twitter logo" />
          <Typography variant="body1" className="route-insta-handle">@crgworcester</Typography>
        </Box>
        <Box>
          <img className="route-instagram-logo" src="/images/IG_logo.png" alt="Instagram logo" />
          <Typography variant="body1" className="route-insta-handle">@crgworcester</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SocialsContainer;