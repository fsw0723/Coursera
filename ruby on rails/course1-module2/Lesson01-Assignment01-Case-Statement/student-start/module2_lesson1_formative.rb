some_var = "false"
another_var = "nil"

case
when  some_var == "pink elephant"
	puts "Don't think about the pink elephant!"
when  some_var == false
	puts "Looks like this one should execute"
when another_var.nil?
	puts "Question mark in the method name?"
else
	puts "I guess nothing matched... But why?"
end