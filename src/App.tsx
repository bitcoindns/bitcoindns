import * as Styles from "./styles";
import Search from "./components/Search";

function App() {
  return (
    <Styles.App>
      <Styles.Header>
        <Styles.H1>Bitcoin DNS</Styles.H1>
        <Styles.InputWrapper>
          <Search />
        </Styles.InputWrapper>
      </Styles.Header>
      <Styles.Footer>
        <Styles.FooterText>
          <Styles.Paragraph>
            <Styles.Small>Powered by </Styles.Small>
            <Styles.Link href="https://xchain.io/" target="_blank">
              <b>Counterparty</b>
            </Styles.Link>
          </Styles.Paragraph>
        </Styles.FooterText>
      </Styles.Footer>
    </Styles.App>
  );
}

export default App;
