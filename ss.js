rds	lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etlorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolor  sit amet et dolor et dolor et dolor et dolor et dolor et dolor etcscds




                    {/* <Grid item lg={12} xs={12}>
                        <Autocomplete
                            id="supervisorDepartment"
                            // value={formFields.supervisorDepartment || ''}
                            options={departmentOptions}
                            required
                            disableCloseOnSelect
                            multiple
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            freeSolo
                            onChange={(event, newValue) => {
                                
                                console.log(newValue, event.target.value, event.target.id);
                                //     e.target.name = e.target.id;
                                //     onFormFieldChange(e);
                                
                                // if (typeof newValue === 'string') {
                                //   setValue({
                                //     title: newValue,
                                //   });
                                // } else if (newValue && newValue.inputValue) {
                                //   // Create a new value from the user input
                                //   setValue({
                                //     title: newValue.inputValue,
                                //   });
                                // } else {
                                //   setValue(newValue);
                                // }
                            }}

                            getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                // if (typeof option === 'string') {
                                //   return option;
                                // }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                  return option.inputValue;
                                }
                                // Regular option
                                return option.departmentName;
                            }}

            
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                const { inputValue } = params;
                        
                                // Suggest the creation of a new value
                                const isExisting = departmentOptions.some((option) => inputValue === option.departmentName);
                                if (inputValue !== '' && !isExisting) {
                                  filtered.push({
                                     inputValue,
                                    departmentName: `Add "${inputValue}"`,
                                  });
                                }
                        
                                return filtered;
                              }}


                            renderOption={(props, option) => <li {...props}>{option.departmentName}</li>}
                            renderInput={(params) => (
                                <TextField {...params} label="Department Name" required={formFields?.supervisorDepartment?.length === 0}
                                />
                            )}
                        />
                    </Grid> */}
