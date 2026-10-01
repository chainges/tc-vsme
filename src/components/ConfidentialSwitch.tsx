import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

function ConfidentialSwitch({
    area,
    checked,
    onChange,
    disabled,
}: {
    area: string
    checked: boolean
    onChange: (area: string, checked: boolean) => void
    disabled: boolean
}) {
    const id = `confidential-${area}`

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Switch
                id={id}
                checked={checked}
                disabled={disabled}
                onCheckedChange={(checked) => onChange(area, checked)}
            />

            <Label htmlFor={id}>
                This content is confidential
            </Label>
        </div>
    )
}

export default ConfidentialSwitch