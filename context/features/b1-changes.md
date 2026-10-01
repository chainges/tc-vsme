### GOAL

Goal is to add feature where user can read some basic information to create a XBRL and also take information from user

### TASK
1) add a switch button whose label will be This report contains disclosures from the previous reporting period that remain unchanged. and default value will be false if this value is true then point 2 and 3 will be shown



2) in basic form add bellow card and table values will be saved in sectionsThatHasNotChanged and use this C:\Users\Hp\Desktop\Work\VSME\tc-vsme\src\data\BASICDATA.ts for data value will be saved

   <Card className="border-slate-200 bg-white text-card-foreground shadow-xs dark:border-slate-800 dark:bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                <Table2 className="size-5 shrink-0 text-blue-600 dark:text-blue-400" />
                Selected Sections
              </CardTitle>
              {selected.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelected(new Set())}
                  className="h-8 gap-1.5 text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                >
                  <Trash2 className="size-3.5" />
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedSections.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-blue-100 bg-blue-50/40 px-6 py-10 text-center dark:border-blue-950 dark:bg-blue-950/10">
                <ClipboardList className="size-6 text-blue-300 dark:text-blue-700" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  No modules selected yet
                </p>
                <p className="max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Choose modules above and they'll appear here with their XBRL
                  member values.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-900/50">
                      <TableHead className="w-20 pl-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Module
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Section
                      </TableHead>
                      <TableHead className="hidden text-xs font-semibold text-slate-500 md:table-cell dark:text-slate-400">
                        XBRL member value
                      </TableHead>
                      <TableHead className="w-14 pr-4" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSections.map((s) => (
                      <TableRow
                        key={s.id}
                        className="transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                      >
                        <TableCell className="pl-4">
                          <Badge
                            variant="outline"
                            className="border-blue-200 bg-blue-50 font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300"
                          >
                            {s.module}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-md text-sm font-medium text-slate-800 dark:text-slate-200">
                          {s.title}
                        </TableCell>
                        <TableCell className="hidden max-w-xs md:table-cell">
                          <code className="block truncate text-xs text-slate-500 dark:text-slate-400">
                            {s.value}
                          </code>
                        </TableCell>
                        <TableCell className="pr-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Remove ${s.module}`}
                            onClick={() => toggleModule(s.module)}
                            className="size-8 rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

3) a input box will be shown whose value will be saved in linkOfPreviousReport and it will be text and its label will be Link to Previous Report

4) UI will be responsive and update schema as well

5) add all these before reportingYear

6) update schema and other places as well

7) above code will be added in new component dont put code in same component