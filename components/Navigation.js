import Link from 'next/link'

const linkStyle = {
  marginRight: 15,
  textAlign: 'right',
  color: 'red',
}

const linkContainerStyle = {
  flex: 3,
  backgroundColor: 'green',
}

const imageStyle = {
  flex: 1,
  backgroundColor: 'blue',
}

const mainContainer = {
  flex: 1,
  flexDirection: 'row',
  backgroundColor: 'yellow',
}

export default function Navigation() {
  return (
    <div>
      <img style={imageStyle} src="../static/Masifunde-Logo.png" />
      <div style={linkContainerStyle}>
        <Link href="/"><a style={linkStyle}>Was wir machen</a></Link>
        <Link href="/"><a style={linkStyle}>Wer wir sind</a></Link>
        <Link href="/"><a style={linkStyle}>Wie Sie helfen</a></Link>
        <Link href="/"><a style={linkStyle}>Spenden</a></Link>
      </div>
    </div>
  );
}