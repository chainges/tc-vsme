### GOAL

Goal is to add a confidential information in all forms

### Apply this to these forms:
B3, B4, B5, B6, B7, B8, B9, B10, B11, C3, C4, C5, C6, C7, C8, C9.
Do not modify B1, B2, C1, C2.

### TASK

1) i have a UI called ConfidentialInfoBox that I have to add in all forms
2) update there schema as well key that will added will loook like ["is" + form Name + Confidential] form Name is B3, B4 B5 .... it will be boolian and its default value will be false
3) that key will updated on base of switch in UI
4) Use C2 as the reference implementation.
        Inspect its:
        - ConfidentialInfoBox placement
        - switch state handling
        - schema field
5) Do NOT add, modify, or refactor SectionHeading as part of this task. Only add ConfidentialInfoBox.




### DONE

- Every target form contains ConfidentialInfoBox.
- B1, B2, C1, C2 remain untouched.
- Every target form has its own boolean field.
- Field naming follows `is<FormName>Confidential`.