# Sustainability Issues UI Specification

## GOAL

The purpose of this file is to define the UI requirements for rendering the sustainability issues data structure into an interactive, hierarchical selection interface.

The UI should represent the hierarchy:

- Main Topic
  - Sub-topic
    - Sub-sub-topic

The implementation should use the existing sustainability issues data structure as the source of truth and should not hard-code individual sustainability topics into the UI components.

## TASK

1) main card will contain three switchs first "Do you have existing sustainability practices/ policies/ future initiatives that address any of the following sustainability issues?" then switch button if this is true then 2nd switch shows "Are they publicly available?" and we have third switch as well that has no condition that will be always visiable "Do the policies have any targets?".
2)   Generate a UI from the provided `C:\Users\Hp\Desktop\Work\VSME\tc-vsme\src\data\initiatives.ts` data structure.

The hierarchy should work as follows:

- Each **main topic** is displayed as the top-level item.
- Each main topic must contain:
  - A checkbox.
  - Its label.
  - A dropdown/expand icon when it contains sub-topics.
- Clicking the dropdown/expand icon should expand or collapse the main topic's sub-topics.
- A sub-topic that contains its own `subtopics` array must display:
  - Its label.
  - A dropdown/expand icon.
- Clicking the sub-topic's dropdown/expand icon should expand or collapse its sub-sub-topics.
- Sub-sub-topics are displayed as the lowest-level items in the hierarchy.

The UI must dynamically determine whether a dropdown icon is required by checking whether the current item contains child `subtopics`.

3) Every **main topic** must be rendered inside its own separate card/container.

4) Checkboxes must be available **only for main topics**.

Rules:

- Main topic → checkbox: **YES**
- Sub-topic → checkbox: **NO**
- Sub-sub-topic → checkbox: **NO**

5) Dropdown/expand controls should only appear when an item contains child topics.

Rules:

- If `subtopics` contains items → show dropdown/expand icon.
- If `subtopics` is empty or does not exist → do not show a dropdown icon.
- Clicking the icon toggles the visibility of the item's children.
- Expanding/collapsing one topic should not unintentionally change the state of unrelated topics.

The expanded/collapsed state should be managed independently for each expandable item.


5) The UI must be generated recursively/dynamically from the data structure.

Do not create separate UI code for:

- Climate change
- Pollution
- Water and marine resources
- Biodiversity and ecosystems
- Own workforce
- Workers in the value chain
- Affected communities
- Consumers and end-users
- Business conduct

Instead, create a reusable rendering approach that understands the structure of:

```javascript
{
  id: "unique-id",
  label: "Main Topic",
  subtopics: [
    "Simple sub-topic",
    {
      label: "Sub-topic with children",
      subtopics: [
        "Sub-sub-topic"
      ]
    }
  ]
}
```

The renderer should support both:

```javascript
subtopics: ["Topic A", "Topic B"]
```

and:

```javascript
subtopics: [
  {
    label: "Topic A",
    subtopics: ["Sub-topic A1", "Sub-topic A2"]
  }
]
```

6) The interface should provide clear interaction states.

For expandable items:

- Collapsed → show a right/down or equivalent collapsed icon.
- Expanded → show an expanded icon.
- Clicking the icon should toggle the children.
- The label itself may remain non-clickable unless the existing application design requires otherwise.

For main-topic checkboxes:

- Checkbox state should be independently controlled.
- Checking/unchecking a main topic should not require checkboxes on child topics.
- The selected main topics should be available to the application as selected IDs or an equivalent data structure.


7) The UI should make the hierarchy immediately understandable.

Recommended visual hierarchy:

- **Main topic**
  - Stronger typography.
  - Checkbox.
  - Dropdown icon when expandable.
  - Card container.

- **Sub-topic**
  - Indented relative to the main topic.
  - No checkbox.
  - Dropdown icon when it has children.

- **Sub-sub-topic**
  - Further indented.
  - No checkbox.
  - No dropdown unless additional nesting exists.

Indentation should increase with nesting depth.

Example:

```text
☐ Own workforce                              ˅
    Working conditions                        ˅
        Secure employment
        Working time
        Adequate wages

    Equal treatment and opportunities        ˅
        Gender equality and equal pay
        Training and skills development
```

8) The UI should provide accessible controls.

Requirements:

- Checkboxes must have accessible labels.
- Dropdown/expand buttons must have an accessible name.
- Expandable controls should expose their expanded/collapsed state where supported.
- Keyboard users should be able to interact with checkboxes and expand/collapse controls.
- Do not rely solely on icons to communicate functionality.

9) The cards and hierarchy should work on:

- Desktop.
- Tablet.
- Mobile.

Long sustainability issue labels should wrap naturally rather than causing horizontal overflow.

Nested content should remain readable on smaller screens.

11) delete all current form fields and add above when user will select some topic these value will be set as values are also provided in data

12) update schema and other places as well

## EXPECTED RESULT

The final UI should provide an interactive sustainability-issues selector where:

1. Every main sustainability topic appears in its own card.
2. Every main topic has a checkbox.
3. Only main topics have checkboxes.
4. Main topics with children have an expand/collapse control.
5. Sub-topics with children have their own expand/collapse control.
6. Sub-sub-topics are displayed under their parent sub-topic.
7. No unnecessary dropdown icons are displayed for leaf nodes.
8. The entire hierarchy is generated dynamically from the `sustainabilityIssues` data structure.
9. The special `Water and marine resources` hierarchy is supported correctly.
10. The implementation is reusable and can support additional nesting without requiring topic-specific UI code.
