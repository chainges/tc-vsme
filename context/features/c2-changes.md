### GOAL

get brief description of practices, policies and targets which a user has set in B2

### TASK

if hasSustainabilityPractices is set true in B2 then get brief description of those in textArea labled as Description of paractices, policies and value of it will be saved in c2_sustainability_practice_description. if value of hasSustainabilityPractices is false then iside a card show text no practices , policies has added in B2.

if policiesHaveTargets is set true in B2 then user has to specify them inside a textArea and value will be saved in c2_monitoring_targets_description

The undertaking may indicate the most senior level within its employees that is accountable for implementing the policies when this has been determined by the undertaking. it will also be a textArea and value will be saved in c2_accountable_role_or_person

update schema and other places

in C:\Users\Hp\Desktop\Work\VSME\tc-vsme\src\routes\_appLayout\app\general\index.tsx i have added descriptionOfPracticesPolicies check for that as well 

in C:\Users\Hp\Desktop\Work\VSME\tc-vsme\src\components\forms\c2-description-paractices-policies-form.tsx we have some queeries remove all of that and add new functionality

