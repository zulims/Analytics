Sub StockData():
Dim ticker As String
Dim volume As Double
Dim change As Double
Dim percent_change As Double
Dim Summary_Table_Row As Integer
volume = 0
change = 0
percent_change = 0

    For Each ws In Worksheets
    
    'Restart summary table at row 2 each time we move to new sheet'
    Summary_Table_Row = 2
    
    'Determine last row for each new sheet'
    lastrow = ws.Cells(Rows.Count, 1).End(xlUp).Row

    'Set Column Labels'
    ws.Range("I1").Value = "Ticker"
    ws.Range("J1").Value = "Yearly Change"
    ws.Range("K1").Value = "Percent Change"
    ws.Range("L1").Value = "Total Stock Volume"
    ws.Range("P1").Value = "Ticker"
    ws.Range("Q1").Value = "Value"

    'Format output ranges'
    ws.Range("k2:k" & lastrow).NumberFormat = "0.00%"
    ws.Range("j2:j" & lastrow).NumberFormat = "0.00000000"

    For i = 2 To lastrow
        
        If ws.Cells(i + 1, 1) <> ws.Cells(i, 1).Value Then
    
            ticker = ws.Cells(i, 1).Value
            volume = volume + ws.Cells(i, 7).Value
            change = change + (ws.Cells(i, 6).Value - ws.Cells(i, 3).Value)
        
            'make sure we're not dividing by zero'
            If (ws.Cells(i, 6).Value - change) > 0 Then
                percent_change = (change / (ws.Cells(i, 6).Value - change))
            Else
                percent_change = 0
            End If
    
            ws.Range("I" & Summary_Table_Row).Value = ticker
            ws.Range("L" & Summary_Table_Row).Value = volume
            ws.Range("J" & Summary_Table_Row).Value = change
            ws.Range("K" & Summary_Table_Row).Value = percent_change
    
            Summary_Table_Row = Summary_Table_Row + 1
    
            volume = 0
            change = 0
            percent_change = 0
    
        Else
        
            volume = volume + ws.Cells(i, 7).Value
            change = change + (ws.Cells(i, 6).Value - ws.Cells(i, 3).Value)
    
        End If
    
    Next i


    'Make lastrow the end of summary table'
    lastrow = ws.Cells(Rows.Count, 9).End(xlUp).Row

    'Apply conditional formmating to Yearly Change column'
    For j = 2 To lastrow
        If ws.Cells(j, 10).Value < 0 Then
            ws.Cells(j, 10).Interior.Color = RGB(255, 0, 0)
        ElseIf ws.Cells(j, 10).Value > 0 Then
            ws.Cells(j, 10).Interior.Color = RGB(0, 255, 0)
        End If
    Next j


    'The "Hard" part'
    ws.Range("O2").Value = "Greatest % Increase"
    ws.Range("O3").Value = "Greatest % Decrease"
    ws.Range("O4").Value = "Greatest Total Volume"
    
    'Find and set the max and min from summary table'
    ws.Range("Q2").Value = WorksheetFunction.Max(ws.Range("K2:K" & lastrow))
    ws.Range("Q3").Value = WorksheetFunction.Min(ws.Range("K2:K" & lastrow))
    ws.Range("Q4").Value = WorksheetFunction.Max(ws.Range("l2:l" & lastrow))

    'Grab and set ticker corresponding to max and min'
    For k = 2 To lastrow
        If ws.Cells(k, 11).Value = ws.Range("Q2").Value Then
            ws.Range("P2").Value = ws.Cells(k, 9).Value
        ElseIf ws.Cells(k, 11).Value = ws.Range("Q3").Value Then
            ws.Range("P3").Value = ws.Cells(k, 9).Value
        ElseIf ws.Cells(k, 12).Value = ws.Range("Q4").Value Then
            ws.Range("P4").Value = ws.Cells(k, 9).Value
        End If
    Next k
    
    ws.Range("Q2:Q3").NumberFormat = "0.00%"

    Next ws

End Sub