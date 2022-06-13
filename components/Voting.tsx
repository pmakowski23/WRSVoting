import { FC } from "react";

import { Button, Group, Switch, Text } from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";

import { useUser } from "@supabase/supabase-auth-helpers/react";
import { PostgrestResponse } from "@supabase/supabase-js";

import { Vote } from "../@types/Vote";

interface VotingProps {
  candidateNames: string[];
  onSubmit: ({ voted_for, voted_by }: Vote) => Promise<PostgrestResponse<any>>;
}

export const Voting: FC<VotingProps> = ({ candidateNames, onSubmit }) => {
  const { user } = useUser();

  const form = useForm({
    initialValues: {
      candidates: formList([
        ...candidateNames.map((name) => ({
          name,
          for: false,
          key: randomId(),
        })),
      ]),
    },
    validate: {
      candidates: {
        for: (_, values) =>
          values.candidates.filter((candidate) => candidate.for).length !== 1
            ? "Please select only one candidate"
            : undefined,
      },
    },
  });
  console.log();

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const { candidates } = values;
        const voted_for = candidates.find((candidate) => candidate.for)
          ?.name as string;
        const voted_by = user?.id as string;
        const response = await onSubmit({ voted_for, voted_by });
        console.log(response);
      })}
    >
      {form.values.candidates.map((item, index) => (
        <Group key={item.key} mt="xs">
          <Text>{item.name}</Text>
          <Switch
            label="Active"
            {...form.getListInputProps("candidates", index, "for")}
          />
        </Group>
      ))}

      {Object.values(form.errors).length > 0 && (
        <>
          <Text color="red">{Object.values(form.errors)[0]}</Text>
        </>
      )}

      <Group position="center" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
