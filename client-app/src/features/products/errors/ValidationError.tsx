import { Message } from "semantic-ui-react";

interface Props {
  errors: string[] | null | undefined;
}

export default function ValidationError({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {Array.isArray(errors) &&
            errors.map((err: string, i) => (
              <Message.Item key={i}>{err}</Message.Item>
            ))}
        </Message.List>
      )}
    </Message>
  );
}
