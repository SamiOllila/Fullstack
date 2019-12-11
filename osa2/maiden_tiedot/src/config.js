
export const weatherApiKey = () => { 
  // const apiKey = process.env.REACT_APP_WEATHER_KEY
  const apiKey = "02253efdfef7eab3acb2f921afe5c034"

  if (apiKey) return apiKey

  console.error('GIVE API KEY AS REACT_APP_WEATHER_KEY ENV VARIABLE')
}