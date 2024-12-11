Attribute VB_Name = "Module1"
Dim S_W As Single, S_H As Single, S_L As Single, S_T As Single

Sub 객체위치복사()
    Dim S_RNG As PowerPoint.ShapeRange
    Set S_RNG = ActiveWindow.Selection.ShapeRange

    If S_RNG.Count > 0 Then
        S_L = S_RNG.Left
        S_T = S_RNG.Top
    End If
End Sub

Sub 객체위치붙여넣기()
    Dim S_RNG As PowerPoint.ShapeRange
    Set S_RNG = ActiveWindow.Selection.ShapeRange

    If S_RNG.Count > 0 Then
        S_RNG.Left = S_L
        S_RNG.Top = S_T
    End If
End Sub

Sub 객체크기복사()
    Dim S_RNG As PowerPoint.ShapeRange
    Set S_RNG = ActiveWindow.Selection.ShapeRange
    
    If S_RNG.Count > 0 Then
        S_W = S_RNG.Width
        S_H = S_RNG.Height
    End If
End Sub

Sub 객체크기붙여넣기()
    Dim S_RNG As PowerPoint.ShapeRange
    Dim shp As Shape
    Set S_RNG = ActiveWindow.Selection.ShapeRange
    
    If S_RNG.Count > 0 Then
        For Each shp In S_RNG
            shp.LockAspectRatio = msoFalse  ' 종횡비 잠금 해제
            shp.Width = S_W
            shp.Height = S_H
            shp.LockAspectRatio = msoTrue   ' 종횡비 잠금 복원 (선택사항)
        Next shp
    End If
End Sub
