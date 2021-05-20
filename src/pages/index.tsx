import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Box, Container, Link, Typography} from "@material-ui/core";

export default function Home() {
  return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
        </Box>
      </Container>
  )
}
