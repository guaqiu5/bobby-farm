import React from 'react'
import {
  TreeSelect,
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm, onFieldReact, FormPathPattern, Field } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Select,
    TreeSelect,
    FormItem,
  },
})

const useAsyncDataSource = (
  pattern: FormPathPattern,
  service: (field: Field) => Promise<{ label: string; value: any }[]>
) => {
  onFieldReact(pattern, (field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async (field) => {
      const linkage = field.query('linkage').get('value')
      if (!linkage) return []
      return new Promise((resolve) => {
        setTimeout(() => {
          if (linkage === 1) {
            resolve([
              {
                label: 'AAA',
                value: 'aaa',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-0-1',
                    key: '0-0-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                label: 'BBB',
                value: 'ccc',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
              },
            ])
          } else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-0-1',
                    key: '0-0-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                label: 'DDD',
                value: 'ddd',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    title: 'Child Node3',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
              },
            ])
          }
        }, 1500)
      })
    })
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Number
        name="linkage"
        title="联动选择框"
        x-decorator="FormItem"
        x-component="Select"
        enum={[
          { label: '发请求1', value: 1 },
          { label: '发请求2', value: 2 },
        ]}
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
      <SchemaField.String
        name="select"
        title="异步选择框"
        x-decorator="FormItem"
        x-component="TreeSelect"
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)