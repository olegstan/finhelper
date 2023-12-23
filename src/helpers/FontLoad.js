// const fontFaces = [...document.fonts.values()];
// const families = fontFaces.map(font => font.family);
//
// // converted to set then to array to remove duplicates
// var list = [...new Set(families)];


export default async (fonts = [], callback = () =>
{
}) =>
{
  await fonts;
  for (const font of fonts)
  {
    document.fonts.check(`80px ${font}`)
      ? document.fonts.load(`80px ${font}`).then(() =>
      {
        console.log(`Font: ${font} loaded ✔️`)
      })
      : console.log(`Font: ${font} not founded ❌`)
  }
  document.fonts.ready.then(() =>
  {
    console.log("Ready");
    callback()
  })
}