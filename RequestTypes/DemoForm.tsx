
import { Option, SingleChoice } from '../../Common/Form/NewChoiceField';
import { Files } from '../../Common/Form/NewFile';
import { Form, Section } from '../../Common/Form/NewForm';
import { Number, ShortText } from '../../Common/Form/NewTextField';

export const GeneralAnalytics = (
  <Form>
    <Section title="Sample specification">
      <SingleChoice
        q="How to you want to enter the request?"
        id="Request Input Type"
      >
        <Option value="Manually as text">
          <ShortText q="Write your request here" id="Request Text" />
        </Option>
        <Option value="By uploading a file">
          <Files
            q="Upload the file with the request data"
            id="Request File"
          />
        </Option>
      </SingleChoice>

      <Number q="Relative complexity of the request" id="Request Complexity" />
    </Section>
  </Form>
);
