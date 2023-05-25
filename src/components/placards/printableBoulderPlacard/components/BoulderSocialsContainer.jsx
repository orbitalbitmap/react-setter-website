import { Box, Typography } from "@mui/material";

// @TODO: Make this dynamic
const BoulderSocialsContainer = () => {
  return (
    <Box className="boulder-social-grid">
      <Box className="boulder-placard-images">
        <img className="boulder-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="CRG Logo"/>
      </Box>
      <Box className="boulder-placard-images boulder-social-media">
        <img className="boulder-instagram-logo" src="/images/IG_logo.png" alt="Instagram Logo"/>
        <Typography variant="body1" className="boulder-insta-handle">@crgworcester</Typography>
      </Box>
    </Box>
  )
}

export default BoulderSocialsContainer;